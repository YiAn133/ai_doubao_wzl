import dayjs from 'dayjs'

export default async function SiderbarNoteList({notes}) {
    const arr = Object.entries(notes);//二维数组
    if(arr.length === 0){
        return <div className="notes-empty">
            No Notes created yet!
        </div>
    }
    return (
        <ul className="notes-list">
            {
                arr.map(([noteId , note]) => {
                    // note是JSON字符串，JSON.parse 把JSON字符串变成JSON对象
                    const {title , updateTime} = JSON.parse(note);
                    return <li key={noteId}>
                        <header className="sider-note-header">
                            <strong>{title}</strong>
                            <br/>
                            <small>{dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}</small>
                        </header>
                    </li>
                })
            }
        </ul>
    )
}