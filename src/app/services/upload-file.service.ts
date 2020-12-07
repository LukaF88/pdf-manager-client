import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + btoa('user:pass')
  })
};

export interface ChangeFileRequest {
  newName: string;
  oldName: string;
}

@Injectable({
  providedIn: 'root'
})


export class UploadFileService {
  baseUrl: string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('date', file.lastModified.toString());
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: httpOptions.headers
    },);

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve`, httpOptions);
  }

  exception(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exception`, httpOptions);
  }

  downloadAndOpenDefault(filename: string): any {
    this.http.get(`${this.baseUrl}/download/`+filename,{
      responseType: 'arraybuffer'} 
     ).subscribe(response => this.downLoadFile(response, "application/pdf"));  }
  
  download(filename: string): any {
      return this.http.get(`${this.baseUrl}/download/`+filename,{
        responseType: 'arraybuffer'} 
       )}


downLoadFile(data: any, type: string) {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  let pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
  }
}

update(_oldname: any, _newname: string) : Observable<any>{
    const req : ChangeFileRequest = {newName: _newname, oldName: _oldname}
    return this.http.post<ChangeFileRequest>(`${this.baseUrl}/update`, req, httpOptions)
  }

  delete(_oldname: any) : Observable<any>{
    const req : ChangeFileRequest = {newName: null, oldName: _oldname}
    return this.http.post<ChangeFileRequest>(`${this.baseUrl}/remove`, req, httpOptions)
  }

}
