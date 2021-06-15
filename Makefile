URL?=http://localhost:8000/api/admin/

init:
	rm -rf .env && touch .env  && echo API_URL=$(URL) >> ./.env
	

serve: 
	 npm run dev