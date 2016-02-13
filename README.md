# cc-dynamic-image

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

## Workflows
Workflows are stored under the `data/workflows` directory, which currently holds two sample workflows for your consideration.

### Accessing a workflow
Each workflow in the directory is executed by name via it's associated server URL:

```
sample.json  ->  http://localhost:3000/w/sample
test.json   ->  http://localhost:3000/w/test
```

### Passing parameters
Parameters are passed in via the query string. For example, to pass a name parameter to the workflow, you would use a URL such as:

```
http://localhost:3000/v/sample?name=Craig
```

If the workflow has a condition based around said parameter, the image may or may not change, depending on the workflow.

### Dynamic image modification
The sever implements the `Caman.js` node module, which allows it to do dynamic image filtering based on a given set of parameters. For example, a `vintage` filter can be applied to any output image by specifying a `vintage` query parameter, like so:

```
http://localhost:3000/v/sample?vintage
http://localhost:3000/v/sample?name=Craig&vintage
```

Additionally, set properties like `brightness` and `contrast` can also be modified by specifying a value, like so:

```
http://localhost:3000/v/sample?contrast=40
http://localhost:3000/v/sample?contrast=10&brightness=30
```

A list of all available filters is available in the `server/renderers/image` file [here](https://github.com/Craga89/cc-dynamic-image/blob/master/src/server/renderers/image.js)

## Example
Here's a list of sample URLs that all produce different images, based on the different parameters being passed through the `sample` workflow:

```
http://localhost:3000/w/sample?name=Craig&age=10&skills[]=JavaScript
http://localhost:3000/w/sample?name=Craig&age=10
http://localhost:3000/w/sample?name=Craig
http://localhost:3000/w/sample
```
