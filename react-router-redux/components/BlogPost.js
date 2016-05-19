import React from 'react'

export default function BlogPost() {
  return (
    <h2>
      {{post.header}}
    </h2>
    <p>
      {{post.content}}
    </p>
    <h3>
      Date
    </h3>
    {{post.timestamp | date:'yyyy-MM-dd HH:mm:ss Z'}}
    <h3>
      Author
    </h3>
    <img width="50" ng-src="app/img/{{post.picture}}" alt="{{post.name}}"> {{post.name}}<br>
    Email: {{post.email}}<br>

    <h3>Tags</h3>
    <ul>
      <li ng-repeat="tag in post.tags">
        {{tag}}
      </li>
    </ul>

    <a href="#/">Back</a>
  )
}
