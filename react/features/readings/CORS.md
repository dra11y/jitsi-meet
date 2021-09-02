# Add to nginx config for testing:

```nginx
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Headers' 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';
add_header 'Access-Control-Allow-Methods' 'GET,HEAD,OPTIONS,POST,PUT';
```
