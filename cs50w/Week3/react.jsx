const App = () => {
    const name = 'John';
    const x = 10;
    const y = 20;
  
    const names = ['Brad', 'Mary', 'Joe', 'Sara'];
    const loggedIn = true;
  
    const styles = {
      color: 'red',
      fontSize: '55px'
    }
  
  
    return (
      <>
        <div className="text-5xl">App</div>
        <p style={styles}>Hello { name }</p>
        <p>
          Your age is { x + y } years
        </p>
        <ul>
          { names.map((name, index) => (
            <li key={index}>{name}</li>
          )) }
          {loggedIn && <h1>Hello Member</h1>}
        </ul>
      </>
    )
  }
  export default App