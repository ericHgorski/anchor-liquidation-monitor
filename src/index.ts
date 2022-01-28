import api from '@/services/api'
import observer from '@/services/sockets'

observer.start()
api.start()
