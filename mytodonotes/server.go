package main

import (
    "log"
    "mime"
    "net/http"
    "path/filepath"
)

func main() {
    // Add proper MIME types for JavaScript modules
    mime.AddExtensionType(".js", "application/javascript")
    
    // Get the current directory
    dir, _ := filepath.Abs(".")
    log.Println("Serving files from:", dir)
    
    // Serve static files from the current directory
    fs := http.FileServer(http.Dir("."))
    http.Handle("/", fs)

    // Start server on port 8080
    log.Println("Serving on http://localhost:8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal(err)
    }
}