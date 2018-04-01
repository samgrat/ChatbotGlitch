# Bug Report

## RESETING A CLIENT FROM THE DATABASE

- STATE property is resilient between message receiving,
- After deleting a client from the database STATE can be used before being updated, (API lag is the reason for it)
- If it happens Client will get an answer from the last state and not state A which is a wrong answer (here is the bug).
- Though, the state will succesfully be A for the next Client message.