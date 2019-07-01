import React from 'react'
import {Select, Dropdown} from 'semantic-ui-react'

export const Chat = props => {
  const {index, array, handleSelect} = props
  let options = array.map(elem => ({
    key: elem,
    text: elem,
    value: elem
  }))
  console.log('Chat: ', options)
  return (
    <div className="chat-container">
      <iframe
        frameBorder="0"
        scrolling="yes"
        id="chat_embed"
        src={`https://www.twitch.tv/embed/${array[index]}/chat?darkpopout`}
        height={props.setHeight}
        width="360"
      />
      {/* <div className="custom-select">
        <select >
      {options.map(item => (
      <option key={item.key} value={item.value} text={item.text} onChange={evt => handleSelect(evt)}>Select the Channel for Chat</option>
      ))}
      </select>
      </div> */}

      <Select
        placeholder="Select the Channel for Chat"
        options={options}
        onChange={evt => handleSelect(evt)}
      />
    </div>
  )
}
