package main

import (
	"strings"

	"github.com/prometheus/common/model"
)

const buildpackKey = "buildpack"

func cleanBuildpacks(v model.Vector) model.Vector {
	unique := map[string]*model.Sample{}
	for _, s := range v {
		cleaned := cleanBuildpack(string(s.Metric[buildpackKey]))
		if us, ok := unique[cleaned]; ok {
			us.Value += s.Value
			continue
		}
		s.Metric[buildpackKey] = model.LabelValue(cleaned)
		unique[cleaned] = s
	}
	vv := model.Vector{}
	for _, s := range unique {
		vv = append(vv, s)
	}
	return vv
}

// cleanBuildpack formats the provided buildpack name to a user-friendly label.
// If the buildpack is not known, "Other" is returned. This is done to keep
// potential sensitive buildpacks from being revealed and also to ensure that
// any junky or empty buildpacks do not fall through.
func cleanBuildpack(name string) string {
	name = strings.TrimSuffix(name, "_buildpack")
	switch name {
	case "binary":
		return "Binary"
	case "dotnet_core":
		return ".NET"
	case "go":
		return "Go"
	case "legacy_mediarelease_java":
		fallthrough
	case "java":
		return "Java"
	case "legacy_marketplace_nodejs":
		fallthrough
	case "nodejs":
		return "Node.js"
	case "php":
		return "PHP"
	case "python":
		return "Python"
	case "ruby":
		return "Ruby"
	case "staticfile":
		return "Static website"
	default:
		return "Other"
	}
}
