OS := $(shell uname)
ARCH := amd64
GO_VERSION := 1.10
DEP_VERSION := 0.4.1

GO ?= go
NODE ?= node
YARN ?= yarn

GOBIN_VERSION := $(shell $(GO) version 2>/dev/null)
NODEBIN_VERSION := $(shell $(NODE) --version 2>/dev/null)
YARNBIN_VERSION := $(shell $(YARN) --version 2>/dev/null)

.PHONY: install
install: install-backend install-frontend

.PHONY: check-backend
check-backend:
ifdef GOBIN_VERSION
else
	@echo Go not found, installing...
	curl -L -s https://dl.google.com/go/go$(GO_VERSION).$(OS)-$(ARCH).tar.gz > go.tar.gz
	tar -C /usr/local -xzf go.tar.gz && rm go.tar.gz
	echo export PATH="\$PATH:/usr/local/go/bin" >> $(HOME)/.profile
	source $(HOME)/.profile
endif

.PHONY: install-backend
install-backend: check-backend
	# Dep
	curl -L -s https://github.com/golang/dep/releases/download/v$(DEP_VERSION)/dep-$(OS)-$(ARCH) -o $(GOPATH)/bin/dep
	chmod +x $(GOPATH)/bin/dep

	# Deps
	dep ensure

.PHONY: check-frontend
check-frontend:
ifdef YARNBIN_VERSION
else
	@echo Yarn not found, installing...
	curl -o- -L https://yarnpkg.com/install.sh | bash
	echo export PATH="\$PATH:$HOME/.yarn/bin" >> $(HOME)/.profile
	source $(HOME)/.profile
endif

.PHONY: install-frontend
install-frontend: check-frontend

.PHONY: test-backend
test-backend:
	$(GO) test -race ./...

.PHONY: test
test: test-backend
