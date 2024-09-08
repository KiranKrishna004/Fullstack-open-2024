import { Button, Flex } from '@mantine/core'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <Flex>
      <Flex style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Flex>
      <Flex direction={'column'} style={showWhenVisible} gap={10}>
        {props.children}
        <Button onClick={toggleVisibility} bg="red">
          cancel
        </Button>
      </Flex>
    </Flex>
  )
})
Togglable.displayName = 'Togglable'
