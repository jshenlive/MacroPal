export default Users () {
  return (
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <lable>First Name</lable>
      <input type="text" placeholder="First Name"/>
      <lable>Last Name</lable>
      <input type="text" placeholder="Last Name"/>
      <lable>Email</lable>
      <input type="email" placeholder="Email Address"/>
      <lable>Password</lable>
      <input type="password" placeholder="Password"/>
      <lable>Password Confirmation</lable>
      <input type="password" placeholder="Password Confirmation"/>
    </form>
  );
}