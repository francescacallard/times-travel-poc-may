resource "google_cloud_run_service" "cloud-run-instance" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      service_account_name = var.service_account

      containers {
        image = var.image_repository

        env {
          name  = "NODE_ENV"
          value = var.target_env
        }

        env {
          name  = "TARGET_ENV"
          value = var.target_env
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = var.max_total_instances
      }
    }
  }

  metadata {
    labels = {
      servicename = var.service_name_tag
      environment = var.target_env
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  autogenerate_revision_name = true
}

# resource "google_cloud_run_domain_mapping" "domain_mapping" {
#   location = var.region
#   name     = var.domain_name

#   metadata {
#     namespace = var.project

#     labels = {
#       servicename = var.service_name_tag
#       environment = var.target_env
#     }
#   }

#   spec {
#     route_name = google_cloud_run_service.cloud-run-instance.name
#   }
# }

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.cloud-run-instance.location
  project  = google_cloud_run_service.cloud-run-instance.project
  service  = google_cloud_run_service.cloud-run-instance.name

  policy_data = data.google_iam_policy.noauth.policy_data
}