This repository contains the source code for the [cloud.gov.au](https://cloud.gov.au) website.

## Developer information
This site is built with [Jekyll](http://jekyllrb.com/).

### Using Docker
Build the local Docker container:
```
docker build -t cga .
```

And run it while in the `cloud.gov.au` directory. This will resolve all application dependencies, serve over port 80 and watch over local changes.
```
docker run --rm --volume="$PWD:/workdir" -p 80:4000 -it cga
```

Point your browser to your docker host, eg `http://localhost/`

