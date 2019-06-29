import React from 'react'
import {Select} from 'semantic-ui-react'

export const Chat = props => {
  const {index, array, handleSelect} = props
  let options = array.map(elem => ({
    key: elem,
    text: elem,
    value: elem
  }))
  return (
    <div className="chat-container">
      <iframe
        frameBorder="0"
        scrolling="yes"
        id="chat_embed"
        src={`https://www.twitch.tv/embed/${array[index]}/chat?darkpopout`}
        height={props.setHeight}
        width="350"
      />
      <Select
        placeholder="Select the Channel for Chat"
        options={options}
        onChange={evt => handleSelect(evt)}
      />
    </div>
  )
}
