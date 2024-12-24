1. find nodes with conditions/ filters

curl --location 'http://localhost:8000/query' \
--data '{
"nodeType": "Region",
"nodeAttribute": "regionDescription",
"filterName": "Eastern",
"queryType": "filter-nodes"
}'

2. find relationships

curl --location 'http://localhost:8000/query' \
--data '{
"nodeAttribute": "regionDescription",
"filterName": "Eastern",
"queryType": "filter-edges"
}'

3. find specific relatiobships

curl --location 'http://localhost:8000/query' \
--data '{
"startNodeType": "Territory",
"endNodeType": "Region",
"relationshipType": "IN_REGION",
"queryType":"specific-edges"
}'

4. find shortest path

curl --location 'http://localhost:8000/query' \
--data '{
"startNodeType": "Employee",
"startNodeDetails": {
"title": "Sales Representative",
"employeeID": "3"
},
"endNodeType": "Region",
"endNodeDetails": {
"regionDescription": "Southern"
},
"queryType": "shortest-path"
}'

5. find all nodes without filter

curl --location 'http://localhost:8000/query' \
--data '{
"nodeType": "Region",
"queryType": "filter-nodes",
"limit": 1
}'

6. find children

curl --location 'http://localhost:8000/query' \
--data '{
"startNodeDetails": {
"title": "Sales Representative",
"employeeID": "3"
},
"queryType": "find-children",
"depth": 1
}'

7. find parents

curl --location 'http://localhost:8000/query' \
--data '{
"startNodeDetails": {
"city": "London",
"title": "Sales Manager"
},
"queryType": "find-parents",
"depth": 1
}'
