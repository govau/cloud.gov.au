package www

import "github.com/prometheus/common/model"

// CFMetrics contains Cloud Foundry metrics.
type CFMetrics struct {
	Deployments model.Vector
}

// CFMetricStore encapsulates Cloud Foundry metrics across multiple
// environments.
type CFMetricStore struct {
	Staging    *CFMetrics
	Production *CFMetrics
}

// NewCFMetricStore makes a new initialized CFMetricStore.
func NewCFMetricStore() *CFMetricStore {
	return &CFMetricStore{
		Staging:    &CFMetrics{},
		Production: &CFMetrics{},
	}
}
