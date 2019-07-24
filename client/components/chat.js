import React from 'react'
import {Select} from 'semantic-ui-react'
// This component renders the chat window for Twitch, and has methods passed down to it so that you can switch the active chat channel with the selector
export const Chat = props => {
  const {index, array, handleSelect} = props
  let options = array.map(elem => ({
    key: elem,
    text: elem,
    value: elem
  }))
  return (
    <div className="chat-container">
      <Select
        placeholder={array[index]}
        options={options}
        onChange={evt => handleSelect(evt)}
      />

      <iframe
        frameBorder="0"
        scrolling="yes"
        id="chat_embed"
        src={`https://www.twitch.tv/embed/${array[index]}/chat?darkpopout`}
        height={props.setHeight}
        width="360"
      />
    </div>
  )
}
