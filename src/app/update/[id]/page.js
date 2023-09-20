"use client"
import { useParams, useRouter } from 'next/navigation';
import React, {useState, useEffect } from 'react'


export default function Creacte() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  useEffect(() => {
    fetch('http://localhost:4000/posts'+id)
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      setTitle(result.title);
      setContent(result.content);
    })
  }, [])

  return (
    <form onSubmit={(e)=> {
      e.preventDefault();
      const title = e.target.title.value;
      const content = e.target.content.value;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title,content})
      }

      fetch('http://localhost:4000/posts/'+id, options)
      .then(res=>res.json())
      .then(result => {
        console.log(result)
        const lastid = result.id;
        router.push(`/read/${lastid}`)
      })
    }}>
      <p>
        <input type="text" name="title" placeholder="title" value={title}
        onChange={e=>setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea name="content" placeholder="content" value = {content}
        onChange={e=>setContent(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  )
}

 