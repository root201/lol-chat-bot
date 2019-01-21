const DEFAULT = undefined;

function createTextElement(options = {}) {
  const {
    text,
    weight,
    size,
    align,
    color,
  } = options;

  return {
    type: 'text',
    text,
    weight: weight || DEFAULT,
    size: size || DEFAULT,
    align: align || DEFAULT,
    color: color || '#000000'
  };
}

function createImageElement(options = {}) {
  const {
    url,
    size,
    aspectRatio,
    aspectMode
  } = options;

  return {
    type: 'image',
    url,
    size: size || 'sm',
    aspectRatio: aspectRatio || '1:1',
    aspectMode: aspectMode || 'fit'
  };
}

function createLinkElement(options = {}) {
  const {
    label,
    uri,
    style,
    color
  } = options;

  return {
    type: 'button',
    style: style || DEFAULT,
    color: color || DEFAULT,
    action: {
      type: 'uri',
      label,
      uri
    }
  };
}

function createSpacerElement(options = {}) {
  const {
    size
  } = options;

  return {
    type: 'spacer',
    size: size || 'xs'
  };
}

function createBoxElement(options = {}) {
  const {
    layout,
    flex,
    spacing,
    contents
  } = options;

  return {
    type: 'box',
    layout: layout || 'vertical',
    flex: flex || DEFAULT,
    spacing: spacing || DEFAULT,
    contents: contents || []
  };
}

function createBubbleElement(options = {}) {
  const {
    direction,
    header,
    body,
    footer,
    styles
  } = options;

  return {
    type: 'bubble',
    direction: direction || 'ltr',
    header: header || DEFAULT,
    body: body || DEFAULT,
    footer: footer || DEFAULT,
    styles: styles || DEFAULT
  };
}

function createCarouselElement(options = {}) {
  const {
    contents
  } = options;

  return {
    type: 'carousel',
    contents: contents || []
  };
}

function createFlexElement(options = {}) {
  const {
    contents
  } = options;

  return {
    type: 'flex',
    contents: contents || {}
  };
}

module.exports = {
  createTextElement,
  createImageElement,
  createLinkElement,
  createSpacerElement,
  createBoxElement,
  createBubbleElement,
  createCarouselElement,
  createFlexElement
};
