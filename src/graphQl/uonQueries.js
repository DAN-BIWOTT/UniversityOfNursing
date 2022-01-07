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
      acceptance_status
    }
  }
`

export const ClientAllSubmissions_query = `query MyOrders($id: Int!) {
  order(where: {client_id: {_eq: $id}}, order_by: {created_at: desc}) {
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

export const AdminAllNewOrders_query = `query AllNewOrders {
  order(order_by: {created_at: desc}, where: {progress_status: {_eq: 0}}) {
    id
    subject
    pages
    budget
    due_time
    price
    topic
    created_at
    acceptance_status
  }
}`;

export const AddUser_query = `mutation AddUser ($email: String, $pass: String,$full_name: String){
  insert_client_one(object: {email: $email, full_name: $full_name, pass: $pass}) {
      email
      full_name
      pass
  }
}`;

export const AdminStatusChange_query = `mutation upDateAcceptanceStatus($orderId: Int!,$status: Int!) {
  update_order_by_pk(pk_columns: {id: $orderId}, _set: {acceptance_status: $status}) {
    acceptance_status
  }
}`;

export const CompleteOrders_query = `query InCompleteOrders {
  order(order_by: {created_at: desc}, where: {progress_status: {_eq: 404}, acceptance_status: {_eq: 303}}) {
    id
    subject
    pages
    budget
    due_time
    price
    topic
    created_at
    acceptance_status
  }
}`;

export const IncompleteOrders_query = `query InCompleteOrders {
  order(order_by: {created_at: desc}, where: {progress_status: {_eq: 0}, acceptance_status: {_eq: 303}}) {
    id
    subject
    pages
    budget
    due_time
    price
    topic
    created_at
    acceptance_status
  }
}`;

export const CompleteOrderButton_query = `mutation CompleteOrder($orderId: Int!,$status: Int!) {
  update_order_by_pk(pk_columns: {id: $orderId}, _set: {progress_status: $status}) {
    progress_status
  }
}`