import React from 'react'
import {Select} from 'semantic-ui-react'
// chat component
export const Chat = props => {
  const {index, array, handleSelect} = props
  let options = array.map(elem => ({
    key: elem,
    text: elem,
    value: elem
  }))
  return (
    <div className="chat-container">
      {/* drop-down menu to toggle between channel chats */}
      <Select
        placeholder={array[index]}
        options={options}
        onChange={evt => handleSelect(evt)}
      />
      {/* chat components itself */}
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
