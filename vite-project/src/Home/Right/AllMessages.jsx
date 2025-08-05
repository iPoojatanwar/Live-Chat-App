import React, { useEffect, useRef } from 'react'
import Messages from './Messages'
import useGetMessages from '../../Context/UseGetMessages'
import Loading from '../../Component/Loading'
import NewMessagesContext from '../../Context/NewMessagesContext'

const AllMessages = () => {
  const [loading, messages] = useGetMessages()
  const lastMessageRef = useRef(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="h-[76.5%] overflow-y-scroll text-center">
      <NewMessagesContext />

      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message, idx) => (
          <div
            key={message._id || idx}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
            <Messages message={message} />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Say! start a conversation with someone</p>
        </div>
      )}
    </div>
  )
}

export default AllMessages
