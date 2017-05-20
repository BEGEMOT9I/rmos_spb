export const UPDATE_MEDIA = 'UPDATE_MEDIA'

export function update(id) {
  return { type: UPDATE_MEDIA, payload: id }
}