package com.example.aerogearjournal.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.example.aerogearjournal.model.Note;
import org.jboss.aerogear.controller.router.rest.pagination.Paginated;
import org.jboss.aerogear.controller.router.rest.pagination.PaginationInfo;
import com.ning.http.client.*;
import java.util.concurrent.Future;

/**
 * 
 */
@Stateless
@Path("/notes")
public class NoteEndpoint
{
   @PersistenceContext
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(Note entity)
   {
      em.persist(entity);

      try {
         AsyncHttpClient asyncHttpClient = new AsyncHttpClient();

         Future<com.ning.http.client.Response> f =
             asyncHttpClient.preparePost("http://localhost:7777/sender/broadcast/5199f94d-e19e-4565-8243-59fdc396f052")
               .addHeader("Content-Type", "application/json")
               .setBody("{\"key\":\"blah\", \"alert\":\"add\"}").execute();

         com.ning.http.client.Response resp = f.get();
         // LOGGER..... :)
         System.out.println(resp);

         // clean up, the resources.......
         asyncHttpClient.close();
      } catch(Exception e) {
         e.printStackTrace();
      }
      return Response.created(UriBuilder.fromResource(NoteEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Note entity = em.find(Note.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);

      try {
         AsyncHttpClient asyncHttpClient = new AsyncHttpClient();

         Future<com.ning.http.client.Response> f =
             asyncHttpClient.preparePost("http://localhost:7777/sender/broadcast/5199f94d-e19e-4565-8243-59fdc396f052")
               .addHeader("Content-Type", "application/json")
               .setBody("{\"key\":\"blah\", \"alert\":\"delete\"}").execute();

         com.ning.http.client.Response resp = f.get();
         // LOGGER..... :)
         System.out.println(resp);

         // clean up, the resources.......
         asyncHttpClient.close();
      } catch(Exception e) {
         e.printStackTrace();
      }
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public Response findById(@PathParam("id") Long id)
   {
      Note entity = em.find(Note.class, id);
      if (entity == null)
      {
         return Response.status(Status.NOT_FOUND).build();
      }
      return Response.ok(entity).build();
   }

   @Paginated
   public List<Note> listAll(final PaginationInfo paginationInfo)
   {
      return getNotes(paginationInfo.getOffset(), paginationInfo.getLimit());
   }

   private List<Note> getNotes(final int offset, final int limit) {
         return em.createQuery("FROM Note", Note.class)
                 .setFirstResult(offset)
                 .setMaxResults(limit)
                 .getResultList();
    }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(@PathParam("id") Long id, Note entity)
   {
      entity.setId(id);
      entity = em.merge(entity);

      try {
         AsyncHttpClient asyncHttpClient = new AsyncHttpClient();

         Future<com.ning.http.client.Response> f =
             asyncHttpClient.preparePost("http://localhost:7777/sender/broadcast/5199f94d-e19e-4565-8243-59fdc396f052")
               .addHeader("Content-Type", "application/json")
               .setBody("{\"key\":\"blah\", \"alert\":\"update\"}").execute();

         com.ning.http.client.Response resp = f.get();
         // LOGGER..... :)
         System.out.println(resp);

         // clean up, the resources.......
         asyncHttpClient.close();
      } catch(Exception e) {
         e.printStackTrace();
      }
      return Response.noContent().build();
   }
}