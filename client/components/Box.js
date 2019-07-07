import React from 'react'
import posed from 'react-pose'

const Box = posed.div({
  hidden: {opacity: 0},
  visible: {opacity: 1}
})

export class BoxElement extends React.Component {
  state = {isVisible: true}

  componentDidMount() {
    setInterval(() => {
      this.setState({isVisible: false})
    }, 1000)
  }

  render() {
    const {isVisible} = this.state
    return <Box className="box" pose={isVisible ? 'visible' : 'hidden'} />
  }
}
export default BoxElement
