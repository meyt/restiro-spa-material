
const methodColors = {
  'get': 'blue',
  'post': 'teal',
  'put': 'orange',
  'delete': 'red'
}

export function getMethodColor (method) {
  if (typeof methodColors[method] === 'undefined') return 'cyan'
  return methodColors[method]
}

export function getResourceAnchor (resource) {
  return resource.tags[0] + '_' + resource.display_name.replace(/\s/g, '-')
}

export function updateFavicon (src) {
  const oldLink = document.querySelector('link[rel*="icon"]')
  if (oldLink) document.head.removeChild(oldLink)
  const link = document.createElement('link')
  link.rel = 'shortcut icon'
  link.href = src
  document.head.appendChild(link)
}
