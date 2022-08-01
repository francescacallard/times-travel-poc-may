terraform {
  backend "gcs" {
    bucket = var.bucket
    prefix = "YOUR SERVICE NAME" // Can't be variable should be static value
  }
}

provider "google" {
  project = var.project
  region  = var.region
}