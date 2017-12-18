package main

import (
	"reflect"
	"sort"
	"testing"

	"github.com/prometheus/common/model"
)

func TestCleanBuildpacks(t *testing.T) {
	tests := []struct {
		name string
		v    model.Vector
		want model.Vector
	}{
		{
			name: "cleaning",
			v: model.Vector{
				&model.Sample{Metric: model.Metric{buildpackKey: "go_buildpack"}},
				&model.Sample{Metric: model.Metric{buildpackKey: "go"}},
				&model.Sample{Metric: model.Metric{buildpackKey: "binary_buildpack"}},
			},
			want: model.Vector{
				&model.Sample{Metric: model.Metric{buildpackKey: "Binary"}},
				&model.Sample{Metric: model.Metric{buildpackKey: "Go"}},
			},
		},
		{
			name: "merging duplicates",
			v: model.Vector{
				&model.Sample{Metric: model.Metric{buildpackKey: "go"}, Value: 3},
				&model.Sample{Metric: model.Metric{buildpackKey: "ruby"}, Value: 4},
				&model.Sample{Metric: model.Metric{buildpackKey: "go"}, Value: 2},
			},
			want: model.Vector{
				&model.Sample{Metric: model.Metric{buildpackKey: "Go"}, Value: 5},
				&model.Sample{Metric: model.Metric{buildpackKey: "Ruby"}, Value: 4},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := cleanBuildpacks(tt.v)
			sort.Slice(got, func(i, j int) bool {
				return got[i].Metric[buildpackKey] < got[j].Metric[buildpackKey]
			})
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("cleanBuildpacks() = %v, want %v", got, tt.want)
			}
		})
	}
}
