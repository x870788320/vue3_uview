// #ifdef APP-VUE 
// import { Signature } from '@signature'
import { Signature } from './signature'
export default {
	data() {
		return {
			canvasid: null,
			signature: null,
			observer: null,
			options: {},
			saveCount: 0,
		}
	},
	mounted() {
		this.$nextTick(this.init)
	},
	methods: {
		init() {
			const el = this.$refs.limeSignature||this.$ownerInstance.$el;
			const canvas = document.createElement('canvas')
			canvas.style = 'width: 100%; height: 100%;'
			el.appendChild(canvas)
			this.signature = new Signature({
				el: canvas
			})
			this.signature.pen.setOption(this.options)
			const width = this.signature.canvas.get('width')
			const height = this.signature.canvas.get('height')

			this.emit({
				changeSize: {
					width,
					height
				}
			})
		},
		undo(v) {
			if (v && this.signature) {
				this.signature.undo()
			}
		},
		clear(v) {
			if (v && this.signature) {
				this.signature.clear()
			}
		},
		save(param) {
			let {fileType = 'png', quality = 1, n} = JSON.parse(param)
			const type = `image/${fileType}`.replace(/jpg/, 'jpeg');
			if (n !== this.saveCount) {
				this.saveCount = n;
				const {backgroundColor, landscape, boundingBox} = this.options
				const flag =  landscape || backgroundColor || boundingBox
				console.log('type', type)
				console.log('flag', flag)
				const image = this.signature.canvas.get('el').toDataURL(!flag && type, !flag && quality)
				console.log('image', image.length)
				if (flag) {
					const canvas = document.createElement('canvas')
					const pixelRatio = this.signature.canvas.get('pixelRatio')
					let width = this.signature.canvas.get('width')
					let height = this.signature.canvas.get('height')
					let x = 0
					let y = 0
					
					const next = () => {
						const size = [width, height]
						console.log('size width', width)
						console.log('size height', height)
						console.log('size pixelRatio', pixelRatio)
						if(landscape) {size.reverse()}
						canvas.width = size[0] * pixelRatio
						canvas.height = size[1] * pixelRatio
						const param = [x, y, width, height, 0 , 0, width, height].map(item => item * pixelRatio)
						const context = canvas.getContext('2d')
						// context.scale(pixelRatio, pixelRatio)
						if (landscape) {
							context.translate(0, width * pixelRatio)
							context.rotate(-Math.PI / 2)
						}
						console.log('backgroundColor', backgroundColor)
						if (backgroundColor) {
							context.fillStyle = backgroundColor
							context.fillRect(0, 0, width * pixelRatio, height * pixelRatio)
						}
						// param
						context.drawImage(this.signature.canvas.get('el'), ...param)
						this.emit({
							save: canvas.toDataURL(type, quality)
						})
						canvas.remove()
					}
					if(boundingBox) {
						const res = this.signature.getContentBoundingBox()
						width = res.width
						height = res.height
						x = res.startX
						y = res.startY
						next()
					} else {
						next()
					}
					
				} else {
					this.emit({
						save: image
					})
				}
			}
		},
		isEmpty(v) {
			if (v && this.signature) {
				const isEmpty = this.signature.isEmpty()
				this.emit({
					isEmpty
				})
			}
		},
		emit(event) {
			this.$ownerInstance.callMethod('onMessage', {
				detail: {
					data: [{
						event
					}]
				}
			})
		},
		update(v) {
			if (v) {
				if (this.signature) {
					this.options = v
					this.signature.pen.setOption(v)
				} else {
					this.options = v
				}
			}
		}
	}
}
// #endif