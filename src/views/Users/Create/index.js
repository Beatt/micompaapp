import * as React from "react"
import UsersForm from "../Form"
import { direccionByCP, coloniasByCP } from "../../../api/searchengines"
import { usersCreate } from "../../../api/users"

const UsersCreate = () => {
  return (
    <div>
      <UsersForm {...{ usersSave: usersCreate, direccionByCP, coloniasByCP }} />
    </div>
  )
}

export default UsersCreate
