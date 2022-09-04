import * as React from "react"
import UsersForm from "../Form"
import { addressGet } from "../../../api/address"
import { usersCreate } from "../../../api/users"

const UsersCreate = () => {
  return (
    <div>
      <UsersForm {...{ usersSave: usersCreate, addressGet }} />
    </div>
  )
}

export default UsersCreate
