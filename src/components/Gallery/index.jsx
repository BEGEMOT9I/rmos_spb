import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import $ from 'jquery'
import _ from 'lodash'

import './index.scss'
import bezier from './bezier'

class Slide extends Component {
  constructor(props) {
    super(props)
  }

  setImageSize(event) {
    let img = event.target,
        aspectRatio = 800 / 1400,
        elementAspectRatio = img.clientHeight / img.clientWidth

    if (elementAspectRatio < aspectRatio) {
      this.height = 800
      this.width = this.height / elementAspectRatio
      this.y = 0
      this.x = (1400 - this.width) / 2
    } else {
      this.width = 1400
      this.height = this.width * elementAspectRatio
      this.y = (800 - this.height) / 2
      this.x = 0
    }

    img.remove()
    this.forceUpdate()
  }

  render() {
    return (
      <li className={ 'slide ' + this.props.className }>
        <div className="svg-wrapper">
          <svg className="svg" viewBox="0 0 1400 800">
            <title>Animated SVG</title>
            <defs>
              <clipPath id={ `slide__image-${this.props.slideId}` }>
                <circle id={ `slide__circle-${this.props.slideId}` } cx={ (this.props.className === 'next-slide') ? '1290' : '110' } cy="400" r={ (this.props.className === 'visible') ? '1364' : '60' }/>
              </clipPath>
            </defs>
            <image x={ this.x } y={ this.y } height={ this.height } width={ this.width } clipPath={ `url(#slide__image-${this.props.slideId})` } xlinkHref={ API_URL + this.props.picture.file.url }></image>
          </svg>
        </div>
   
        <div className="slide__content">
          <h2 className="content__title">{ this.props.picture.title }</h2>
          <a className="content__button" href={ API_URL + this.props.picture.file.url } target="_blank" download>СКАЧАТЬ</a>
        </div>

        <img className="slide__image_hidden" src={ API_URL + this.props.picture.file.url } onLoad={ this.setImageSize.bind(this) }/>
      </li>
    )
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createSlider()
  }

  createSlider() {
    this.duration = 400
    this.epsilon = (1000 / 60 / this.duration) / 4
    this.customMinaAnimation = bezier(.42,.03,.77,.63, this.epsilon)
    this.element = $('.slider-wrapper')
    this.slider = this.element.find('.slider')
    this.slides = this.slider.children('li')
    this.slidesNumber = this.slides.length
    this.visibleIndex = 0
    this.nextVisible = 1
    this.prevVisible = this.slidesNumber - 1
    this.navigation = this.element.find('.navigation')
    this.animating = false
    this.mask = this.element.find('.masks')
    this.leftMask = this.mask.find('mask').eq(0)
    this.rightMask = this.mask.find('mask').eq(1)
  }

  updateSlides(direction) {
    //store the clipPath elements which need to be animated/updated
    var clipPathVisible = Snap('#'+this.slides.eq(this.visibleIndex).find('circle').attr('id')),
      clipPathPrev = Snap('#'+this.slides.eq(this.prevVisible).find('circle').attr('id')),
      clipPathNext = Snap('#'+this.slides.eq(this.nextVisible).find('circle').attr('id'));

    var radius1 = this.slider.data('radius1'),
      radius2 = this.slider.data('radius2'),
      centerx = ( direction == 'next' ) ? this.slider.data('centerx2') : this.slider.data('centerx1');

    this.slides.eq(this.visibleIndex).addClass('is-animating').removeClass('next-slide prev-slide');

    if( direction == 'next' ) {
      //animate slide content
      this.slides.eq(this.visibleIndex).addClass('content-reveal-left');
      this.slides.eq(this.prevVisible).addClass('content-hide-left');
      //mask slide image to reveal navigation round element
      this.slides.eq(this.visibleIndex).find('image').attr('style', 'mask: url(#'+this.leftMask.attr('id')+')');

      //animate slider navigation round element
      clipPathNext.attr({
        'r': radius1,
        'cx': this.slider.data('centerx2'),
      });
      this.slides.eq(this.nextVisible).addClass('next-slide move-up');
      this.slides.filter('.prev-slide').addClass('scale-down');
    } else {
      //animate slide content
      this.slides.eq(this.visibleIndex).addClass('content-reveal-right');
      this.slides.eq(this.nextVisible).addClass('content-hide-right');
      //mask slide image to reveal navigation round element
      this.slides.eq(this.visibleIndex).find('image').attr('style', 'mask: url(#'+this.rightMask.attr('id')+')');

      //animate slider navigation round element
      clipPathPrev.attr({
        'r': radius1,
        'cx': this.slider.data('centerx1'),
      });
      this.slides.eq(this.prevVisible).addClass('prev-slide move-up');
      this.slides.filter('.next-slide').addClass('scale-down');
    }

    // reveal new slide image - animate clipPath element
    clipPathVisible.attr({
      'r': radius1,
      'cx': centerx,
    }).animate({'r': radius2}, this.duration, this.customMinaAnimation, () => {

      if( direction == 'next' ) {
        this.slides.filter('.prev-slide').removeClass('prev-slide scale-down');
        clipPathPrev.attr({
          'r': radius1,
          'cx': this.slider.data('centerx1'),
        });
        this.slides.eq(this.prevVisible).removeClass('visible').addClass('prev-slide');
      } else {
        this.slides.filter('.next-slide').removeClass('next-slide scale-down');
        clipPathNext.attr({
          'r': radius1,
          'cx': this.slider.data('centerx2'),
        });
        this.slides.eq(this.nextVisible).removeClass('visible').addClass('next-slide');
      }
      this.slides.eq(this.visibleIndex).removeClass('is-animating').addClass('visible').find('image').removeAttr('style');
      this.slides.filter('.move-up').removeClass('move-up');

      setTimeout(() => {
        this.slides.eq(this.visibleIndex).removeClass('content-reveal-left content-reveal-right');
        this.slides.eq(this.prevVisible).removeClass('content-hide-left content-hide-right');
        this.slides.eq(this.nextVisible).removeClass('content-hide-left content-hide-right');
        this.animating =  false;
      }, 100);
    }); 
  }

  updateIndexes(direction) {
    if (direction === 'next') {
      this.prevVisible = this.visibleIndex;
      this.visibleIndex = this.nextVisible;
      this.nextVisible = ( this.nextVisible + 1 < this.slidesNumber) ? this.nextVisible + 1 : 0;
    } else {
      this.nextVisible = this.visibleIndex;
      this.visibleIndex = this.prevVisible;
      this.prevVisible = ( this.prevVisible > 0 ) ? this.prevVisible - 1 : this.slidesNumber - 1;
    }
  }

  moveSlide(event) {
    if (!this.animating) {
      event.preventDefault();
      var direction = ( $(event.target).hasClass('next') ) ? 'next' : 'prev';
      this.animating =  true;
      //update radialSlider index properties
      this.updateIndexes(direction);
      //show new slide
      this.updateSlides(direction);
    }
  }

  generateSlides() {
    let slides = [],
        lastSlide,
        key = _.uniqueId('slide-')

    slides.push(<Slide key={ key } slideId={ key } className="visible" picture={ this.props.pictures[0] }/>)

    if (this.props.pictures.length >= 2) {
      key = _.uniqueId('slide-')
      lastSlide = (<Slide key={ key } slideId={ key } className="prev-slide" picture={ this.props.pictures[this.props.pictures.length - 1] }/>)

      let className
      this.props.pictures.slice(1, this.props.pictures.length - 1).forEach((picture, i) => {
        key = _.uniqueId('slide-')
        className = (i === 0) ? 'next-slide' : ''

        slides.push(<Slide key={ key } slideId={ key } className={ className } picture={ picture }/>)
      })

      slides.push(lastSlide)
    }

    return slides
  }

  render() {
    return (
      <div className="page-template__block pictures">
        <h1>Галерея</h1>
        {
          !!this.props.pictures.length &&
          <div className="slider-wrapper">
            <ul className="slider" data-radius1="60" data-radius2="1364" data-centerx1="110" data-centerx2="1290">
              {
                this.generateSlides()
              }
            </ul>
           
            <ul className="navigation">
              <li className="navigation__item"><div className="next" onClick={ this.moveSlide.bind(this) }>Next</div></li>
              <li className="navigation__item"><div className="prev" onClick={ this.moveSlide.bind(this) }>Prev</div></li>
            </ul>
            
            <div className="masks">
              <svg viewBox="0 0 1400 800">
                <defs>
                  <mask id="mask_left" height='800px' width="1400px" x="0" y="0" maskUnits="userSpaceOnUse">
                    <path fill="white" d="M0,0v800h1400V0H0z M110,460c-33.137,0-60-26.863-60-60s26.863-60,60-60s60,26.863,60,60S143.137,460,110,460z"/>
                  </mask>
           
                  <mask id="mask_right" height='800px' width="1400px" x="0" y="0" maskUnits="userSpaceOnUse">
                    <path fill="white" d="M0,0v800h1400V0H0z M1290,460c-33.137,0-60-26.863-60-60s26.863-60,60-60s60,26.863,60,60S1323.137,460,1290,460z"/>
                  </mask>
                </defs>
              </svg>
            </div>
          </div>
        }
      </div>
    )
  }
}

Gallery.propTypes = {
  pictures: PropTypes.array
}

const mapStateToProps = state => ({
  pictures: state.siteData.pictures
})

export default connect(mapStateToProps)(Gallery)
