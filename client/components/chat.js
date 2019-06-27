import React from 'react'
import {Select, Search, Button, Form, Checkbox} from 'semantic-ui-react'

export const Chat = props => {
  const {name, options, handleSelect} = props
  return (
    <div>
      <div>
        <iframe
          frameBorder="0"
          scrolling="no"
          id="chat_embed"
          src={`https://www.twitch.tv/embed/${name}/chat`}
          height="500"
          width="350"
        />
      </div>
      <Select
        placeholder="Select the Channel for Chat"
        options={options}
        onChange={evt => handleSelect(evt)}
      />
    </div>
  )
}
