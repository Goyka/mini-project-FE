

export default async function Read(props) {
  const res = await fetch(`http://localhost:4000/posts/${props.params.id}`
  , {cache:'no-store'});
  const topic = await res.json();
  return (
    <div>
      <h2>{topic.title}</h2>
      {topic.content}
    </div>
    
  )
}
