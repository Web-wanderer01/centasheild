System Architecture: CentaShield 

​High-Level Architecture

​CentaShield follows a Middleware/Agent architecture where it sits between the incoming traffic and the core application logic.




Data Flow
​Request Arrival: User sends a request to the server.
​Inspection: CentaShield inspects headers and payload.
​Validation: If valid, the request proceeds; if malicious, it is dropped and logged.
​Logging: Data is sent to the dashboard for real-time viewing.