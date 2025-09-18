import React from 'react'

const UserDetailPage = async ({ params }) => {
  const { customer_id } = await params;
  return (
    <main>UserDetailPage {customer_id}</main>
  )
}

export default UserDetailPage