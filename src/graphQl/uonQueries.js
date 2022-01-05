export const AdminOrderDetail_Query = `query MyQuery($id: Int!) {
    order_by_pk(id: $id) {
      budget
      client_id
      created_at
      dispute_status
      doc_description
      doc_format
      due_time
      id
      nature
      pages
      payment_status
      price
      progress_status
      revision_status
      spacing
      subject
      topic
      files
    }
  }`

export const AllOrders_Query = `query AllOrders {
    order(order_by: {created_at: desc}) {
      id
      subject
      pages
      budget
      due_time
      price
      topic
      created_at
    }
  }`;

  export const ClientOrderDetail_Query = `query MyQuery($id: Int!) {
    order_by_pk(id: $id) {
      budget
      client_id
      created_at
      dispute_status
      doc_description
      doc_format
      due_time
      id
      nature
      pages
      payment_status
      price
      progress_status
      revision_status
      spacing
      subject
      topic
      acceptance_status
      files
    }
  }`;

  export const dispute_query = `mutation updateDispute($orderId:Int!,$disputeValue:Int!) {
    update_order_by_pk(pk_columns: {id: $orderId}, _set: {dispute_status: $disputeValue}) {
      dispute_status
    }
  }`;

  export const NewOrderForm_query = `mutation addOrder($client_id: Int!, $budgetRangeString: String, $price: Int!, $paperFormat: String, $nature: String, $pages: String, $deadline: String, $spacing: String, $subject: String, $topic: String, $description: String, $files: String) {
    insert_order_one(object: {budget: $budgetRangeString, client_id: $client_id, doc_description: $description, doc_format: $paperFormat, due_time: $deadline, files: $files, nature: $nature, pages: $pages, price: $price, spacing: $spacing, subject: $subject, topic: $topic}) {
      id
      files
    }
  }`

  export const UserSpecific_query = `
  query UserSpecificOrders($id: Int!) {
    order(order_by: {created_at: desc}, where: {client_id: {_eq: $id}}) {
      id
      subject
      pages
      budget
      due_time
      price
      topic
      created_at
    }
  }
`