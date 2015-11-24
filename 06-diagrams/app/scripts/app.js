import page from 'page'
import * as pages from './pages'

page('/', '/home')
page('/home', pages.home)

page('/error', pages.internalError)
page('*', pages.notFound)

page()
