import {$} from "@core/dom";

export function tableResizeHandler($root, event) {
  const $resize = $(event.target)
  const $parent = $resize.closest('[data-type="resizeble"]')
  const coords = $parent.getCoords()
  const type = $resize.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resize.css({
    opacity: 1,
    zIndex: 10,
    [sideProp]: '-5000px'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resize.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resize.css({bottom: -delta + 'px'})
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    $resize.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}