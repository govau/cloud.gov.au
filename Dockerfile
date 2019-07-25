FROM circleci/ruby:2.6.3-stretch

RUN echo '#!/usr/bin/env bash \n\
\n\
cd /workdir \n\
sudo bundle install --path=vendor/bundle \n\
sudo JEKYLL_ENV=production bundle exec jekyll serve -H 0.0.0.0 --watch --drafts --destination ./_site \n\
\n\
exec "$@"' > /tmp/start.sh

RUN chmod +x /tmp/start.sh

WORKDIR /workdir

ENTRYPOINT ["/tmp/start.sh"]

