# Makefile

ENV_FILE ?= .env.dev
include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

.PHONY: build deploy 

build:
	sam build

deploy: build
	sam deploy \
		--parameter-overrides \
			UploadBucketName=$(UPLOAD_BUCKET) \
			StageName=$(STAGE_NAME) \

# Set Python files to check (recursive in the current directory)
PY_FILES := $(shell find . -type f -name "*.py" -not -path "./.venv/*" -not -path "*/migrations/*")

# Format code with black
format:
	@echo "Formatting with black..."
	@black .

# Lint with flake8
lint:
	@echo "Running flake8 lint..."
	@flake8 $(PY_FILES)

# Format + lint
check: format lint

# Install dependencies (if using requirements-dev.txt)
install-dev:
	pip install -r requirements-dev.txt

lock-dev:
	pip-compile requirements-dev.in --output-file=requirements-dev.txt

lock:
	pip-compile requirements.in --output-file=requirements.txt

# Install app dependencies from locked file
install:
	pip install -r requirements.txt

# Install dev dependencies from locked file
install-dev:
	pip install -r requirements-dev.txt

# Help menu
help:
	@echo "Available targets:"
	@echo "  make format        - Format code with black"
	@echo "  make lint          - Lint code with flake8"
	@echo "  make check         - Format then lint"
	@echo "  make install       - Install app requirements"
	@echo "  make install-dev   - Install dev requirements"
	@echo "  make lock          - Lock requirements.txt"
	@echo "  make lock-dev      - Lock requirements-dev.txt"
	@echo "  make lock-all      - Lock all requirements"

