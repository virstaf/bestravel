import React from 'react'

const ReservationDetailPage = async ({ params}) => {
    const { ref_id } = await params;
  return (
    <main>ReservationDetailPage {ref_id}</main>
  )
}

export default ReservationDetailPage    