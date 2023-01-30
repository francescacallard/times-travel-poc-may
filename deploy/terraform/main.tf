terraform {
  backend "gcs" {
    bucket = var.bucket
    prefix = "nuk-create-react-template" // Can't be variable should be static value
  }
}

provider "google" {
  project = var.project
  region  = var.region
}