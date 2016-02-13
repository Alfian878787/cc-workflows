# cc-workflows

## Setup

### Installation

First, [install the `node-canvas` dependencies](https://github.com/Automattic/node-canvas#installation) and then run
```
npm install
```

### Run
Start up the server and go to [http://localhost:3000](http://localhost:3000)
```
npm start
```

## Examples
Here's a list of sample URLs for each of the sample workflows included:

### `workflows/image.json`
* [http://localhost:3000/w/image?name=Craig&age=10&skills[]=JavaScript](http://localhost:3000/w/image?name=Craig&age=10&skills[]=JavaScript)
* [http://localhost:3000/w/image?name=Craig&age=10](http://localhost:3000/w/image?name=Craig&age=10)
* [http://localhost:3000/w/image?name=Craig](http://localhost:3000/w/image?name=Craig)
* [http://localhost:3000/w/image](http://localhost:3000/w/image)

### `workflows/twitter.json`
* [http://localhost:3000/w/twitter?username=commcorp](http://localhost:3000/w/twitter?username=commcorp)
* [http://localhost:3000/w/twitter?username=craigsworks](http://localhost:3000/w/twitter?username=craigsworks)

### `workflows/uRL.json`
* [http://localhost:3000/w/url?customerId=1](http://localhost:3000/w/url?customerId=1)
* [http://localhost:3000/w/url?customerId=2](http://localhost:3000/w/url?customerId=2)

## Workflows
Workflows are stored under the `data/workflows` directory, which currently holds a few sample workflows for your consideration.

### Accessing a workflow
Each workflow in the directory is executed by name via it's associated server URL:

```
image.json  ->  http://localhost:3000/w/image
test.json   ->  http://localhost:3000/w/twitter
test.json   ->  http://localhost:3000/w/url
```

### Passing parameters
Parameters are passed in via the query string. For example, to pass a name parameter to the workflow, you would use a URL such as:

```
http://localhost:3000/v/image?name=Craig
```

If the workflow has a condition based around said parameter, the image may or may not change, depending on the workflow.

### Output types
The server currently understands these different output types:

#### Images
Images are served by the server by streaming the image from the given `url` key valueto the users browsers in real-time.
```
{
    type: "image",
    url: "http://mydomain.com/image.jpg"
}
```

##### Dynamic image modification
The sever implements the `Caman.js` node module, which allows it to do dynamic image filtering based on a given set of parameters. For example, a `vintage` filter can be applied to any output image by specifying a `vintage` query parameter, like so:

```
http://localhost:3000/v/image?vintage
http://localhost:3000/v/image?name=Craig&vintage
```

Additionally, set properties like `brightness` and `contrast` can also be modified by specifying a value, like so:

```
http://localhost:3000/v/image?contrast=40
http://localhost:3000/v/image?contrast=10&brightness=30
```

A list of all available filters is available in the `server/renderers/image` file [here](https://github.com/Craga89/cc-dynamic-image/blob/master/src/server/renderers/image.js)

#### Twitter feeds
Twitter feeds are served by the server by producing a `json` file containing the top `10` tweets for a given `username` key value:
```
{
    type: "twitter",
    username: "commcorp"
}
```

#### URLs
URLs are served by the server by simply redirecting the user to the `url` key value:
```
{
    type: "url",
    url: "http://google.com"
}
```
