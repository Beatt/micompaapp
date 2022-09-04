import * as React from "react"
import UsersForm from "../Form"
import { direccionByCP, coloniasByCP } from "../../../api/searchengines"
import { usersCreate } from "../../../api/users"

const UsersCreate = () => {
  return <UsersForm {...{ usersSave: usersCreate, direccionByCP, coloniasByCP }} />
}

export default UsersCreate
