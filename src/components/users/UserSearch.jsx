import { useContext, useState } from "react"
import GithubContext from "../../context/GithubContext";
import AlertContext from "../../context/AlertContext";
import { searchUsers } from "../../context/GithubActions";

function UserSearch() {
  const [text, setText] = useState('');
  const {users, clearUsers, dispatch} = useContext(GithubContext);
  const {setAlert, alert} = useContext(AlertContext)

  const handleChange = (e)=>{
    setText(e.target.value)
  }

  const handleSubmit = async (e)=>{
      e.preventDefault()

      if(text === ''){
        setAlert('Please provide something', 'error')
      }else{
        dispatch({
          type: 'SET_LOADING'
        })
        const users = await searchUsers(text)
        dispatch({
          type:'GET_USERS',
          payload: users
        })
        setText('');
      }
  }


  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-2 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="relative">
                <input type="text" value={text} className="w-full pr-40 bg-gray-200 input-lg text-black rounded-lg" onChange={handleChange} placeholder="Search" />
                <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg" type="submit">
                    Go
                </button>
              </div>
            </div>
        </form>
      </div>
      {users.length>0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={()=>{
            dispatch({
              type: 'CLEAR_USERS'
            })
          }}>
            Clear
          </button>
        </div>
      )}

    </div>
  )
}

export default UserSearch