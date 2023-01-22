# CodeEngine Deployment (experimental)

- `ibmcloud login -r us-south`
- `ibmcloud cr login`
- `yarn build-storybook`
- `podman build -t ce-carbon-vue3/storybook . -f ce/alpine.dockerfile`
- `podman tag ce-carbon-vue3/storybook:latest us.icr.io/ce-carbon-vue3/storybook:latest`
- `podman push us.icr.io/ce-carbon-vue3/storybook:latest`
- `ibmcloud target -r us-east`
- `ibmcloud ce proj select --name testing`
- `ibmcloud ce app update --name vue3`
