React schedules state changes. This means if we call the state updating 
function inside a handler then this state doesn't change on the very next 
line after this call to the state updating function.

When there is a scheduled state change, only after the state change is 
processed the component re-evalutaion would occur.

If we have multiple outstanding state changes for the same state then when
the state changes are processed and component function is re-evaluated, 
state changes occurred inbetween before the component function 
re-execution started would not be considered if we our state updating 
function depends on the previous state and we have not used the function 
form of state updating function. This is why we should use function form of state updating 
function to ensure that the scheduled state changes are considered to 
provide the latest state change in the state updating function.

To better understand this see this example:
https://codesandbox.io/s/xzbsm

https://stackoverflow.com/questions/57828368/why-react-usestate-with-functional-update-form-is-needed


If in a handler multiple state changes for different states or for the same 
state occurrs then React will batch all such synchronous state changes 
occurring inside the handler function and React will treat this as one 
process or as one scheduled state change and hence re-evaluate the 
component function only once after processing each state change in this 
batch.