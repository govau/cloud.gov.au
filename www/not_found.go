package www

import "net/http"

type notFoundResponseWriter struct {
	w        http.ResponseWriter
	notFound bool
	content  []byte
}

func newNotFoundResponseWriter(w http.ResponseWriter, c []byte) http.ResponseWriter {
	return &notFoundResponseWriter{w: w, content: c}
}

func (w *notFoundResponseWriter) Header() http.Header {
	return w.w.Header()
}

func (w *notFoundResponseWriter) Write(b []byte) (int, error) {
	if w.notFound {
		return w.w.Write(w.content)
	}
	return w.w.Write(b)
}

func (w *notFoundResponseWriter) WriteHeader(code int) {
	if code == http.StatusNotFound {
		w.notFound = true
		w.w.Header().Set("Content-Type", "text/html; charset=utf-8")
	}
	w.w.WriteHeader(code)
}
