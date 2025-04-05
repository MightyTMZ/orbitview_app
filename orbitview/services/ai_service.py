# services/ai_services.py
from typing import List, Dict
import openai
from django.conf import settings
import numpy as np

class AIService:
    @staticmethod
    async def generate_embeddings(text: str) -> List[float]:
        response = await openai.Embedding.acreate(
            input=text,
            model="text-embedding-ada-002"
        )
        return response['data'][0]['embedding']

    @staticmethod
    async def generate_content_suggestions(user_profile: Dict) -> List[Dict]:
        prompt = f"""Given this professional profile:
        Name: {user_profile['name']}
        Expertise: {', '.join(user_profile['skills'])}
        Current Focus: {user_profile['current_focus']}
        
        Generate 3 engaging LinkedIn post ideas that would help build their personal brand."""
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a personal brand expert."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content']

    @staticmethod
    async def calculate_skill_match(project_requirements: List[str], 
                                  user_skills: List[str]) -> float:
        # Convert skills to embeddings
        project_embeddings = await AIService.generate_embeddings(
            " ".join(project_requirements))
        user_embeddings = await AIService.generate_embeddings(
            " ".join(user_skills))
        
        # Calculate cosine similarity
        similarity = np.dot(project_embeddings, user_embeddings) / (
            np.linalg.norm(project_embeddings) * np.linalg.norm(user_embeddings))
        
        return float(similarity)